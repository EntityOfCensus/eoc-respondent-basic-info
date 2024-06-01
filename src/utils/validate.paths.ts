export default function validatePathId(req, res, ctx) {
    if(req.claims.sub != decodeURIComponent((req.params.id + '').replace(/\+/g, '%20'))) {
        return Response.json(
            {
                success: false,
                error: 'path not allow',
            },
            {
                status: 403,
            }
        );        
    }
};