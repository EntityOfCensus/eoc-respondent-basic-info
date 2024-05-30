import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { RespondentBasicData } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const decode = require('jwt-claims');

export class RespondentBasicDataList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentBasicData"],
		summary: "Returns all RespondentBasicData from the system that the user has access to",
        description: "Returns all RespondentBasicData from the system that the user has access to",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			page: Query(Number, {
				description: "Page number",
				default: 0,
			}),
			isCompleted: Query(Boolean, {
				description: "Filter by completed flag",
				required: false,
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of tasks",
				schema: {
					success: Boolean,
					result: {
						RespondentBasicData: [RespondentBasicData],
					},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const { page, isCompleted } = data.query;
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
        console.log("prisma: " + prisma);
        return await prisma.respondentBasicData.findMany({
            where: {activeAccount: true}, 
            include: {
              ClaimData: true, // Return all fields
            }
          });
	}
    
}