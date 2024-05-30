export default async function updateClaimData(prisma, req) {
    const claimData = {
      email: req.claims.email,
      emailVerified: req.claims.email_verified,
      familyName: req.claims.family_name,
      givenName: req.claims.given_name,
      name: req.claims.name,
      nickname: req.claims.nickname,
      picture: req.claims.picture,
      walletAddress: req.claims.walletAddress,
      respondentBasicDataId: req.claims.sub
    }
    return await prisma.claimData.upsert({
      where: { respondentBasicDataId: req.claims.sub},
      update:  claimData,
      create:  claimData 
     });      
}