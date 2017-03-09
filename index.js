const divide = (a, b) => {
	const frac = a / b
	const quot = frac | 0
	return [quot, a - quot * b]
}

const stretch = (words, used, width) => {
	const justifications = words.length - 1

	if (justifications === 0) {
		return words[0]
	} else {
		const free = width - used
		let out = words[0]
		let [quot, rem] = divide(free, justifications)
		for (let i = 1; i < words.length; i++) {
			out += ' '.repeat(i > rem ? quot : quot + 1) + words[i]
		}
		return out
	}
}

const center = (words, used, width) => {
	const text = words.join(' ')
	return ' '.repeat((width - text.length) / 2 | 0) + text
}

const left = words => words.join(' ')

const right = (words, used, width) => {
	const text = words.join(' ')
	return ' '.repeat(width - text.length) + text
}

const justify = (words, width, justifier) => {
	const len = words.length
	const lines = []

	let i = 0
	while (i < len) {
		let line = []
		let used = 0
		let spaces = 0
		let leftovers = 0

		while (i < len) {
			const word = leftovers === 0 ? words[i] : words[i].substring(leftovers)
			const word_len = word.length
			const next_used = used + word_len

			if (word_len > width) {
				const allowed = width - (used + spaces)
				if (allowed <= 0) break
				line.push(word.substring(0, allowed))
				lines.push(justifier(line, used + allowed, width))
				line = []
				used = 0
				spaces = 0
				leftovers = leftovers + allowed
			} else if (next_used + spaces <= width) {
				line.push(word)
				used = next_used
				i++
				spaces++
				leftovers = 0
			} else {
				break
			}
		}

		lines.push(justifier(line, used, width))
	}

	return lines
}

const wrap = (text, width) => {
	const lines = []
	const len = text.length

	lines.push(text.substr(0, width))

	let i = width

	while (i < len) {
		while (text[i] === ' ') i++

		lines.push(text.substr(i, width))
		i += width
	}

	return lines
}

module.exports = {
	left,
	right,
	center,
	stretch,
	justify,
	wrap
}
