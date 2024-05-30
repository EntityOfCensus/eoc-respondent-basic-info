import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { RespondentBasicDataList } from "./endpoints/basic-info/respondentBasicDataList";
import { RespondentBasicDataCreate } from "./endpoints/basic-info/respondentBasicDataCreate";
import { RespondentBasicDataGet } from "./endpoints/basic-info/respondentBasicDataGet";
import { RespondentBasicDataPut } from "./endpoints/basic-info/respondentBasicDataPut";
import { RespondentBasicDataDelete } from "./endpoints/basic-info/respondentBasicDataDelete";
import { createCors } from 'itty-router';
import secure from './utils/secure';
import validatePathId from './endpoints/basic-info/validate.paths';
export const router = OpenAPIRouter({
	docs_url: "/",
});
const { preflight, corsify } = createCors({
	origins: ['*'],
	methods: ['*'],
	maxAge: 84600,
  });

router.all('*', preflight);

router.get("/api/tasks/", TaskList);
router.post("/api/tasks/", TaskCreate);
router.get("/api/tasks/:taskSlug/", TaskFetch);
router.delete("/api/tasks/:taskSlug/", TaskDelete);



router.get("/basic-info/", secure, RespondentBasicDataList);

router.post("/basic-info/", secure, RespondentBasicDataCreate);

router.get("/basic-info/:id", secure, validatePathId, RespondentBasicDataGet);

router.put("/basic-info/:id", secure, validatePathId, RespondentBasicDataPut);

router.delete("/basic-info/:id", secure, validatePathId, RespondentBasicDataDelete);

router.registry.registerComponent(
	'securitySchemes',
	'BearerAuth',
	{
	  type: 'http',
	  scheme: 'bearer',
	},
  )

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);



export default {
    fetch: async (request, env, ctx) => {
		return router.handle(request, env, ctx).then(corsify)
	 },
};
