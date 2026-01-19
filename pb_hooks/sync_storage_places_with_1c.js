/// <reference path="../pb_data/types.d.ts" />

onSchedule("*/10 * * * *", async () => {  
    const url = "http://192.168.1.101/shop/odata/standard.odata/Catalog_%D0%9C%D0%B5%D1%81%D1%82%D0%B0%D0%A5%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F?$format=json";

    try {
        const res = await fetch(url);
        const json = await res.json();

        const items = json.value || [];

        const pb = $app.dao();
        const collection = $app.collections.get("storage_place");

        // First pass: upsert all items without parents
        for (const it of items) {
            const existing = await pb.findFirstRecord(collection.id, "ref = {:ref}", {
                ref: it.Ref_Key
            }).catch(_ => null);

            const data = {
                ref: it.Ref_Key,
                parent_ref: it.Parent_Key || "",
                name: it.Description || ""
            };

            if (existing) {
                existing.set(data);
                await pb.saveRecord(existing);
            } else {
                const r = new Record(collection);
                r.set(data);
                await pb.saveRecord(r);
            }
        }

        // Second pass: assign parent_id using ref lookup
        for (const it of items) {
            if (!it.Parent_Key) continue;

            const child = await pb.findFirstRecord(collection.id, "ref = {:ref}", {
                ref: it.Ref_Key
            }).catch(_ => null);

            const parent = await pb.findFirstRecord(collection.id, "ref = {:ref}", {
                ref: it.Parent_Key
            }).catch(_ => null);

            if (child && parent) {
                child.set("parent_id", parent.id);
                await pb.saveRecord(child);
            }
        }

        console.log("[CRON] storage_place sync completed");

    } catch (err) {
        console.error("[CRON] Error:", err);
    }
});
