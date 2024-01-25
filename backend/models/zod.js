const z = require("zod");

const userZodSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	username: z.string().email(),
	password: z.string().min(6)
});

module.exports = {
	userZodSchema,
};
