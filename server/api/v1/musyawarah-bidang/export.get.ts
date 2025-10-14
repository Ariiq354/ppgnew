import { exportMusyawarahBidangService } from "~~/server/modules/musyawarah-bidang";
import { OBidangSchema } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidangSchema.parse(q));

  return exportMusyawarahBidangService(event, user, query);
});
