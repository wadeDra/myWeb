let service = require('../services/index')
import langData from './data'

export default async (ctx, next) => {

  const langDefault = 'en';
  let lang = ctx.cookies.get('lang') || langDefault;
  let location = lang + '/about'
  let data = await service.findOneAbout(lang)
  let pageData = langData[lang]

  await ctx.render('about', {
    ...data,
    ...pageData,
    address: JSON.parse(data.address),
    content: JSON.parse(data.content),
  })
}
