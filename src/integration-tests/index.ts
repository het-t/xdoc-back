import app from "@main/config/app";
import supertest from "supertest";

export const _req = supertest(app());