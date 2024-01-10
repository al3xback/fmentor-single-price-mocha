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
		const sectionElements = document.querySelectorAll('section');

		assert.equal(sectionElements.length, 3);
	});

	it("should have a first section element with a class of 'card__block--join-community'", () => {
		const sectionElements = document.querySelectorAll('section');
		const firstSectionElement = sectionElements[0];

		assert.match(
			firstSectionElement.className,
			/card__block--join-community/
		);
	});

	it("should have a second section element with a class of 'card__block--monthly-subsription'", () => {
		const sectionElements = document.querySelectorAll('section');
		const secondSectionElement = sectionElements[1];

		assert.match(
			secondSectionElement.className,
			/card__block--monthly-subsription/
		);
	});

	it("should have a third section element with a class of 'card__block--why-us'", () => {
		const sectionElements = document.querySelectorAll('section');
		const thirdSectionElement = sectionElements[2];

		assert.match(thirdSectionElement.className, /card__block--why-us/);
	});
});
