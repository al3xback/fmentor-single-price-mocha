import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-single-price-mocha/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have three section elements', () => {
		const sectionEls = document.querySelectorAll('section');

		assert.equal(sectionEls.length, 3);
	});

	it("should have a first section element with a class of 'card__block--join-community'", () => {
		const sectionEls = document.querySelectorAll('section');
		const firstSectionEl = sectionEls[0];

		assert.match(firstSectionEl.className, /card__block--join-community/);
	});

	it("should have a second section element with a class of 'card__block--monthly-subsription'", () => {
		const sectionEls = document.querySelectorAll('section');
		const secondSectionEl = sectionEls[1];

		assert.match(
			secondSectionEl.className,
			/card__block--monthly-subsription/
		);
	});

	it("should have a third section element with a class of 'card__block--why-us'", () => {
		const sectionEls = document.querySelectorAll('section');
		const thirdSectionEl = sectionEls[2];

		assert.match(thirdSectionEl.className, /card__block--why-us/);
	});
});
