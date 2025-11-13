import sanitizeHtml from "sanitize-html";
import {
  createLaporanMuslimunService,
  OLaporanMuslimunCreate,
} from "~~/server/modules/laporan-muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMuslimunCreate.parse(b)
  );

  body.keterangan = sanitizeHtml(body.keterangan, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["style"], // allow style attributes on all tags
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });

  await createLaporanMuslimunService(user.kelompokId!, body);

  return HttpResponse();
});
