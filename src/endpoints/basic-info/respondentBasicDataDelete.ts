import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { RespondentBasicData } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import updateClaimData from "./updateClaimData";	

const decode = require('jwt-claims');

export class RespondentBasicDataDelete extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentBasicData"],
		summary: "deletes a single RespondentBasicData based on the ID supplied",
        description: "deletes a single RespondentBasicData based on the ID supplied",
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
			"204": {
				description: "RespondentBasicData response",
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
		  await prisma.respondentBasicData.update({
			where: { id: request.claims.sub },
			data: {
			  'activeAccount': false,
			}      
		  });
		  await updateClaimData(prisma, request);	
		  return Response.json(
            {
                status: 204,
            }
        );	
	}
    
}