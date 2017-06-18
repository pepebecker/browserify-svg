'use strict'

const path = require('path')
const cheerio = require('cheerio')
const through = require('through2')

module.exports = function (file) {
	if (path.extname(file).toLowerCase() !== '.svg') {
		return through()
	}

	const parts = []
	return through(function (part, enc, next) {
		parts.push(part)
		next()
	}, function (done) {
		let data = parts.join('')

		const $ = cheerio.load(data)
		const svg = $('svg')
		const html = $.html(svg)
		
		const content = `module.exports = \`${html}\``

		this.push(content)
		done()
	})
}