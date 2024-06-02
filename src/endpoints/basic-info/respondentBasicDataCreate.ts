import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentBasicData, RespondentBasicData } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import updateClaimData from "./updateClaimData";	

export class RespondentBasicDataCreate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentBasicData"],
		summary: "Creates a new RespondentBasicData in the store. ",
        description: "Creates a new RespondentBasicData in the store. ",
        security: [
            {
                BearerAuth: [],
            },
          ],
		requestBody:  NewRespondentBasicData,
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
		  const resBody =  await prisma.respondentBasicData.upsert({
			where: { id: request.claims.sub },
			update: {
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
			  'activeAccount': true
			},
			create: {
			  'id': request.claims.sub,
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