import { defineBackend } from '@aws-amplify/backend';
import { apiFunction } from './api_function/resource';

defineBackend({
  apiFunction
});
