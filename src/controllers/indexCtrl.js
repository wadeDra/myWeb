let service = require('../services/index')
import langData from './data'

export default async (ctx, next) => {
  const langDefault = 'en';
  let lang = ctx.cookies.get('lang') || langDefault;

  let home = await service.findOneHome(lang)
  let news = await service.findOneNews(lang)
  let about = await service.findOneAbout(lang)
  let pageData = langData[lang]
  console.log(pageData)

  await ctx.render('index', {
    home: {
      ...home,
      imgs: JSON.parse(home.imgs)
    },
    news: {
      ...news,
      list: JSON.parse(news.list)
    },
    about: {
      ...about,
      address: JSON.parse(about.address),
      content: JSON.parse(about.content),
    },
    ...pageData,
  })
}
