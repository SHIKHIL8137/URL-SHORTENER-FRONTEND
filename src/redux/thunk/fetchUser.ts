import { createAsyncThunk } from "@reduxjs/toolkit";
import { userDataFetch } from "../../api/Api";

export const fetchData = createAsyncThunk("admin/fetch", async () => {
  const res = await userDataFetch();
  return res.data;
});
