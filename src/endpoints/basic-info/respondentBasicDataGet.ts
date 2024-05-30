import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { RespondentBasicData } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class RespondentBasicDataGet extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentBasicData"],
		summary: "Returns a RespondentBasicData based on a single ID",
        description: "Returns a RespondentBasicData based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			id: Path(String, {
				description: "ID of RespondentBasicData to fetch",
				default: 0,
			}),
		},
		responses: {
			"200": {
				description: "RespondentBasicData response",
				schema: {
					success: Boolean,
					result: {
						RespondentBasicData: RespondentBasicData,
					},
				},
			},
		},
	};

	async handle(
		request: any,
		env: any,
		context: any,
		data: Record<string, any>
	) {
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
        return await prisma.respondentBasicData.findFirst({
			where: {id: decodeURIComponent((data.params.id + '').replace(/\+/g, '%20')), AND: {activeAccount: true}},
			include: {
			  ClaimData: true, // Return all fields
			}
		  });
	}
    
}