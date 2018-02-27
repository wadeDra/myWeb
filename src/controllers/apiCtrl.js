let service = require('../services/index')

export let getHomeAll = async (ctx, next) => {
  let data = await service.findAllHome()
  ctx.body = {
    success: true,
    data: {
      ...data,
      imgs: JSON.parse(data.imgs),
      banner: {
        src: data.banner
      }
    }
  }
}

export let getNewsAll = async (ctx, next) => {
  let data = await service.findAllNews()
  ctx.body = {
    success: true,
    data: {
      ...data,
      list_en: JSON.parse(data.list_en),
      list_zh: JSON.parse(data.list_zh),
      banner: {
        src: data.banner
      }
    }
  }
}

export let getAboutAll = async (ctx, next) => {
  let data = await service.findAllAbout()
  ctx.body = {
    success: true,
    data: {
      ...data,
      address_zh: JSON.parse(data.address_zh),
      address_en: JSON.parse(data.address_en),
      content_en: JSON.parse(data.content_en),
      content_zh: JSON.parse(data.content_zh),
      banner: {
        src: data.banner
      },
      img: {
        src: data.img
      },
    }
  }
}

export let getServiceAll = async (ctx, next) => {
  let data = await service.findAllService()

  if (typeof data.list_en === 'string') {
    data.list_en = JSON.parse(data.list_en)
  }
  if (typeof data.list_zh === 'string') {
    data.list_zh = JSON.parse(data.list_zh)
  }
  ctx.body = {
    success: true,
    data: {
      ...data,
      banner: {
        src: data.banner
      }
    }
  }
}

export let updateHome = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: await service.updateHome(ctx.request.body)
  }
}

export let updateNews = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: await service.updateNews(ctx.request.body)
  }
}

export let updateAbout = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: await service.updateAbout(ctx.request.body)
  }
}

export let updateService = async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    success: true,
    data: await service.updateService(ctx.request.body)
  }
}

export default {
  getHomeAll,
  getNewsAll,
  getAboutAll,
  getServiceAll,
  updateHome,
  updateNews,
  updateAbout,
  updateService,
}