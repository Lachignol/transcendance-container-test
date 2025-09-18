import { uploadsDir } from '../server.ts'
import type { FastifyRequest, FastifyReply } from 'fastify';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export const sendUploadForm = async (request: FastifyRequest, reply: FastifyReply) => {

	return reply.sendFile('views/uploadFile.html')
}


export const sendUploadMiddlewareForm = async (request: FastifyRequest, reply: FastifyReply) => {

	return reply.sendFile('views/uploadMiddlewareFile.html')
}


export const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.txt'];


export const uploadFile = async (request: FastifyRequest, reply: FastifyReply) => {

	const data = await request.file();
	if (!data) {

		return reply.code(400).send({ error: 'No file uploaded' });

	}
	if (validateFile(data.filename) == false) {

		return reply.code(400).send({
			error: 'File validation failed',
		});

	}
	const ext = data.filename.substring(data.filename.lastIndexOf('.'));
	const uniqueFilename = `${randomUUID()}${ext}`;
	const filepath = path.join(uploadsDir, uniqueFilename);
	try {
		await pipeline(data.file, createWriteStream(filepath));

		return {
			success: true,
			originalFilename: data.filename,
			storedFilename: uniqueFilename,
			mimetype: data.mimetype,
			encoding: data.encoding,
			path: filepath
		};
	} catch (error) {

		console.log(error);
		return reply.code(500).send({ error: 'Failed to save file' });
	}
}




export function validateFile(filename: string) {

	if (!filename || filename.trim() === '') {
		console.log('No filename provided');
		return false;
	}

	const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
	if (!allowedExtensions.includes(ext) || filename.lastIndexOf('.') == 0) {
		console.log(`File extension '${ext}' not allowed. Allowed: ${allowedExtensions.join(', ')}`);
		return false;
	}

	return true;
}

