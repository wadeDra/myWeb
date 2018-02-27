let service = require('../services/index')
import langData from './data'

export default async (ctx, next) => {
  const langDefault = 'en';
  let lang = ctx.cookies.get('lang') || langDefault;
  let data = await service.findOneNews(lang)
  let pageData = langData[lang]

  await ctx.render('news', {
    ...pageData,
    ...data,
    list: JSON.parse(data.list)
  })
}
