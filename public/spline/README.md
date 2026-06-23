# Hero Spline robot

## Your scene file

Source (Spline editor format): `source/robot_follow_cursor_for_landing_page_mc-2.spline`

The website loads **`hero-robot.splinecode`** — the web export format. `.spline` files cannot run in the browser directly.

## Replace with your robot

1. Open [app.spline.design](https://app.spline.design)
2. **File → Import** and choose `source/robot_follow_cursor_for_landing_page_mc-2.spline`
3. **Export → Code → Download** (`.splinecode`)
4. Save as `public/spline/hero-robot.splinecode` (overwrite)
5. Redeploy

Or set `NEXT_PUBLIC_SPLINE_HERO_SCENE` to a `https://prod.spline.design/.../scene.splinecode` URL.
