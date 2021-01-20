/* eslint-disable @typescript-eslint/camelcase */
// import { ExpressContext } from "../../types";
// import { Profile } from "../../entity/Profile";
import { isAuth } from "../../middleware/isAuth";
import { Resolver, UseMiddleware, Query } from "type-graphql";

import Stripe from "stripe";
const stripe = new Stripe(String(process.env.STRIPE_KEY), {
  apiVersion: "2020-08-27",
});

@Resolver()
export class StripeResolvers {
  @UseMiddleware(isAuth)
  @Query(() => String, { nullable: true })
  async stripe(): Promise<string> {
    // const account = await stripe.accounts.create({
    //   country: "US",
    //   type: "express",
    //   capabilities: {
    //     card_payments: {
    //       requested: true,
    //     },
    //     transfers: {
    //       requested: true,
    //     },
    //   },
    // });

    // const accountLinks = await stripe.accountLinks.create({
    //   account: account.id,
    //   refresh_url: "https://localhost:3000/login",
    //   return_url: "http://localhost:4000/graphql",
    //   type: "account_onboarding",
    // });

    // console.log("account links:", accountLinks);

    const link = await stripe.accounts.createLoginLink("acct_1IAihBQuw2qkkC1a");

    console.log("link:", link.url);

    const thisAccount = await stripe.accounts.retrieve("acct_1IAihBQuw2qkkC1a");

    console.log("account:", thisAccount);

    return "Hello, world!";
  }
}
