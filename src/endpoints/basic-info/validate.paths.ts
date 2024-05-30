export default function validatePathId(req, res, ctx) {
    console.log('request params id', decodeURIComponent((req.params.id + '').replace(/\+/g, '%20')));
    console.log('req.claims.sub ', req.claims.sub );
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