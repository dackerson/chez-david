import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  OrderItem: a.model({
      content: a.string(),
      isDone: a.boolean()
  name: a.string();
  quantity?: a.number();
  imageBlob?: a.blob();
    })
    .authorization(allow => [allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema
});
