import useAuth from "./useAuth";

const useEncryption = (publicKey, privateKey) => {
	let importedPrivateKey = null;
	let importedPublicKey = null;

	const base64ToArrayBuffer = (base64) => {
		var binary_string = window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	};

	const arrayBufferToBase64 = (buffer) => {
		var binary = "";
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	};

	const importPublicKey = async () => {
		const binaryDer = base64ToArrayBuffer(publicKey);
		var cryptoKey = await window.crypto.subtle.importKey(
			"spki",
			binaryDer,
			{
				name: "RSA-OAEP",
				hash: { name: "sha-256" },
			},
			false,
			["encrypt"]
		);
		importedPublicKey = cryptoKey;
	};

	const importPrivateKey = async () => {
		const binaryDer = base64ToArrayBuffer(privateKey);
		var cryptoKey = await window.crypto.subtle.importKey(
			"pkcs8",
			binaryDer,
			{
				name: "RSA-OAEP",
				hash: { name: "sha-256" },
			},
			true,
			["decrypt"]
		);

		importedPrivateKey = cryptoKey;
	};

	const encryptMessage = async (message) => {
		if (importedPublicKey === null) await importPublicKey();

		let enc = new TextEncoder();
		let encodedMessage = enc.encode(message);
		const encryptedData = await window.crypto.subtle.encrypt(
			{
				name: "RSA-OAEP",
			},
			importedPublicKey,
			encodedMessage
		);
		const encodedData = arrayBufferToBase64(encryptedData);
		return encodedData;
	};

	const decryptMessage = async (cypherText) => {
		if (importedPrivateKey === null) await importPrivateKey();

		const decryptedData = await window.crypto.subtle.decrypt(
			{
				name: "RSA-OAEP",
			},
			importedPrivateKey,
			base64ToArrayBuffer(cypherText)
		);

		return new TextDecoder().decode(decryptedData);
	};

	return {
		encryptMessage,
		decryptMessage,
	};
};

export default useEncryption;
