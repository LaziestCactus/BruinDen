// npm install @prisma/client
// npx prisma generate
import prisma from "./prisma/libs/prismadb";

// USER QUERY FUNCTIONS

async function createUser(name: string, email: string, hashedPassword: string) {
  return await prisma.User.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
}

async function deleteUser(id: string) {
  return await prisma.User.delete({
    where: { id },
  });
}

async function getUserByEmail(email: string) {
  return await prisma.User.findUnique({
    where: { email: email },
  });
}

async function getUserByID(id: string) {
  return await prisma.user.findUnique({
    where: { id: id },
  });
}

//update user, given its id and parameter(s) need to be updated
async function updateUser(
  id: string,
  name?: string,
  email?: string,
  hashedPassword?: string,
  image?: string
) {
  // Intialize a map for possibly mapped data fields
  const data: { [key: string]: string } = {}; //might need to use "any" instead of "string"
  // Conditionally add fields to the data object
  if (name) data.name = name;
  if (email) data.email = email;
  if (hashedPassword) data.hashedPassword = hashedPassword;
  if (image) data.image = image;
  // Perform the update operation using prisma
  return await prisma.User.update({
    where: { id },
    data: data,
  });
}

async function createAccount(
  userId: string,
  type: string,
  provider: string,
  providerAccountId: string
) {
  //create and update should be promise functions
  const newAccount = await prisma.Account.create({
    data: {
      userId,
      type,
      provider,
      providerAccountId,
    },
  });
  await prisma.User.update({
    where: { id: userId },
    data: {
      accounts: {
        connect: { id: newAccount.id }, // Connect the new account to the user
      },
    },
  });
  return newAccount;
}

// LISTING QUERY FUNCTIONS

async function createListing(
  userID: string,
  title: string,
  description: string,
  imageSrc: string,
  category: string,
  roomCount: number,
  bathroomCount: number,
  address: string,
  price: number
) {
  const newListing = await prisma.Listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      address,
      price,
    },
  });
  await prisma.User.update({
    where: { id: userID },
    data: { listings: { connect: { id: newListing.id } } },
  });
  return newListing;
}

async function updateListing(
  id: string,
  data: {
      title?: string;
      description?: string;
      imageSrc?: string;
      roomCount?: number;
      bathroomCount?: number;
      price?: number;
      category?: string;
  }) {
      try {
          const updatedListing = await prisma.Listing.update({
              where: {
                  id,
              },
              data: {
                  ...data,
              }
          });
          return updatedListing;
      } catch (error) {
          console.error("ERROR UPDATING LISTING: ", error);
          throw new Error("LISTING COULD NOT BE UPDATED");
      }
}

async function deleteListing(id: string) {
  try {
      const deletedListing = await prisma.Listing.delete({
          where: {
              id,
          },
      });
      return deletedListing;
  } catch (error) {
      console.error("ERROR DELETING LISTING: ", error);
      throw new Error("LISTING COULD NOT BE DELETED");
  }
}

async function getListingByFilter(listing_name?: string, date_posted?: Date, bedroom_count?: number, bathroom_count?: number, price_lower?: number, price_upper?: number) { // Update to take in a map of values instead
  return await prisma.Listing.findMany({
      where: {
          ...(listing_name && { title: { contains: listing_name, mode: 'insensitive', },}),
          ...(date_posted && { createdAt: { equals: date_posted },}), // most likely change this for better use cases
          ...(bedroom_count && { roomCount: bedroom_count }),
          ...(bathroom_count && { bathroomCount: bathroom_count }),
          ...(price_lower !== undefined && price_upper !== undefined
              ? {
                  price: {
                      ...(price_lower !== undefined && {gte: price_lower}),
                      ...(price_upper !== undefined && {lte: price_upper}),
                  },
              }
              : {}),
      },
  });
}