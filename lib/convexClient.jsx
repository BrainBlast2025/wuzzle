// lib/convexClient.js
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL); // replace with your Convex URL

export default convex;
