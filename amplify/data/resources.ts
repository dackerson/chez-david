import { apiFunction } from "../api_function/resource"
import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  OrderItem: a.model({
	  name: a.string(),
	  quantity?: a.number(),
	  imageBlob?: a.blob()
    })
    .authorization(allow => [allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema
});
