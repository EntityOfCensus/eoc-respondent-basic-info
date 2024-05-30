-- CreateTable
CREATE TABLE "RespondentBasicData" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "country" TEXT,
    "city" TEXT,
    "county" TEXT,
    "postalCode" TEXT,
    "gender" TEXT,
    "activeAccount" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RespondentBasicData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimData" (
    "respondentBasicDataId" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" BOOLEAN,
    "familyName" TEXT,
    "givenName" TEXT,
    "name" TEXT,
    "nickname" TEXT,
    "picture" TEXT,
    "walletAddress" TEXT,

    CONSTRAINT "ClaimData_pkey" PRIMARY KEY ("respondentBasicDataId")
);

-- AddForeignKey
ALTER TABLE "ClaimData" ADD CONSTRAINT "ClaimData_respondentBasicDataId_fkey" FOREIGN KEY ("respondentBasicDataId") REFERENCES "RespondentBasicData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
