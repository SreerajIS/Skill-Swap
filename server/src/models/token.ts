import { InferSchemaType, Schema, model } from "mongoose";

const tokenSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

type Token = InferSchemaType<typeof tokenSchema>;

export default model <Token>("Token",tokenSchema)
