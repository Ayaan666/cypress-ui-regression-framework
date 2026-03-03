import { request, APIRequestContext } from "@playwright/test";

export async function apiLogin(): Promise<APIRequestContext> {
  const context = await request.newContext({
    baseURL: "https://opensource-demo.orangehrmlive.com",
  });

  await context.post("/web/index.php/auth/validate", {
    form: {
      username: "Admin",
      password: "admin123",
    },
  });

  return context;
}
