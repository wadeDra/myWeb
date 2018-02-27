/**
 * Created by wade on 17/3/10.
 */
// var Work = require('../models/Work');
import Home from '../models/home'
import News from '../models/news'
import About from '../models/about'
import Service from '../models/service'

export default {
  findOneHome: async function (lang) {
    return await Home.findOne(
    {
      'attributes': [
        ['title' + '_' + lang, 'title'],
        ['title_desc' + '_' + lang, 'title_desc'],
        ['title_one' + '_' + lang, 'title_one'],
        ['title_one_desc' + '_' + lang, 'title_one_desc'],
        ['title_two' + '_' + lang, 'title_two'],
        ['title_two_desc' + '_' + lang, 'title_two_desc'],
        ['title_two_desc_two' + '_' + lang, 'title_two_desc_two'],
        'imgs',
        'banner',
      ],
      'raw': true
    }
    );
  },
  findAllHome: async function () {
    return await Home.findOne({
      raw: true
    })
  },
  findOneNews: async function (lang) {
    return await News.findOne(
    {
      'attributes': [
        ['title' + '_' + lang, 'title'],
        ['desc' + '_' + lang, 'desc'],
        ['subtitle' + '_' + lang, 'subtitle'],
        ['subdesc' + '_' + lang, 'subdesc'],
        ['list' + '_' + lang, 'list'],
        'banner',
      ],
      'raw': true
    }
    );
  },
  findAllNews: async function () {
    return await News.findOne({
      raw: true
    })
  },
  findOneAbout: async function (lang) {
    return await About.findOne(
    {
      'attributes': [
        ['title' + '_' + lang, 'title'],
        ['desc' + '_' + lang, 'desc'],
        ['subtitle' + '_' + lang, 'subtitle'],
        ['content' + '_' + lang, 'content'],
        ['address' + '_' + lang, 'address'],
        'banner',
        'img',
      ],
      'raw': true
    }
    );
  },
  findAllAbout: async function () {
    return await About.findOne({
      raw: true
    })
  },
  findOneService: async function (lang) {
    return await Service.findOne(
    {
      'attributes': [
        ['title' + '_' + lang, 'title'],
        ['desc' + '_' + lang, 'desc'],
        ['list' + '_' + lang, 'list'],
        'banner',
      ],
      'raw': true
    }
    );
  },
  findAllService: async function () {
    return await Service.findOne({
      raw: true
    })
  },
  updateHome: async function (home) {
    return await Home.update(home, {
      where: {
        id: home.id
      }
    })
  },
  updateNews: async function (news) {
    return await News.update(news, {
      where: {
        id: news.id
      }
    })
  },
  updateAbout: async function (about) {
    return await About.update(about, {
      where: {
        id: about.id
      }
    })
  },
  updateService: async function (service) {
    return await Service.update(service, {
      where: {
        id: service.id
      }
    })
  },

}