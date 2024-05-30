import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentBasicData, RespondentBasicData } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import updateClaimData from "./updateClaimData";	

const decode = require('jwt-claims');

export class RespondentBasicDataPut extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentBasicData"],
		summary: "Update RespondentBasicData in the store based on a single ID",
        description: "Update RespondentBasicData in the store based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
		  requestBody:  NewRespondentBasicData,
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
		  const resBody =  await prisma.respondentBasicData.update({
			where: { id: request.claims.sub, AND: {activeAccount: true} },
			data: {
			  'firstName': data.body.firstName,
			  'lastName': data.body.lastName,
			  'email': data.body.email,
			  'dateOfBirth': (new Date(data.body.dateOfBirth)).toISOString(),
			  'country': data.body.country,
			  'city': data.body.city,
			  'county': data.body.county,
			  'postalCode': data.body.postalCode,
			  'gender': data.body.gender,
			  'agreeOnTerms': data.body.agreeOnTerms,
			}      
		  });
		  resBody['ClaimData'] = await updateClaimData(prisma, request);
		
        return resBody;
	}
    
}