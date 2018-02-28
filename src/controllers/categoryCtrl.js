export default async (ctx, next) => {
  const name = ctx.params.name
/*
  let home = await service.findOneHome(lang)
  let news = await service.findOneNews(lang)
  let about = await service.findOneAbout(lang)
  let pageData = langData[lang]
  console.log(pageData)
*/

  await ctx.render('categories/' + name)
}
