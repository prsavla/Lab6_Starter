// RecipeCard.js

class RecipeCard extends HTMLElement {
	constructor() {
		super();

		// A1. Attach the shadow DOM
		this.shadow = this.attachShadow({ mode: 'open' });

		// A2. Create an <article> element
		this.article = document.createElement('article');

		// A3. Create a <style> element
		const style = document.createElement('style');

		// A4. Insert styles from cardTemplate.html (inside <style> tag)
		style.textContent = `
			* {
				font-family: sans-serif;
				margin: 0;
				padding: 0;
			}
			article {
				border: 1px solid #dcdcdc;
				border-radius: 8px;
				overflow: hidden;
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
				width: 300px;
			}
			article img {
				width: 100%;
				object-fit: cover;
				height: 200px;
			}
			p.title {
				font-size: 1.2em;
				font-weight: bold;
				padding: 10px;
			}
			p.title a {
				text-decoration: none;
				color: black;
			}
			p.organization {
				padding: 0 10px;
				color: #555;
				font-size: 0.9em;
			}
			div.rating {
				padding: 10px;
				display: flex;
				align-items: center;
			}
			div.rating > span {
				margin-right: 5px;
			}
			time {
				display: block;
				padding: 0 10px 10px;
				color: #555;
				font-size: 0.9em;
			}
			ul.ingredients {
				list-style: none;
				padding: 10px;
			}
			ul.ingredients li {
				font-size: 0.9em;
				margin-bottom: 4px;
			}
		`;

		// A5. Append <style> and <article> to the shadow root
		this.shadow.append(style, this.article);
	}

	set data(data) {
		if (!data) return;

		// A6. Select the <article> from the shadow DOM
		const article = this.article;

		// A7. Set the contents of <article> using the template and provided data
		article.innerHTML = `
			<img src="${data.imgSrc}" alt="${data.imgAlt}">
			<p class="title"><a href="${data.titleLnk}">${data.titleTxt}</a></p>
			<p class="organization">${data.organization}</p>
			<div class="rating">
				<span>${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</span>
				<span>(${data.numRatings})</span>
			</div>
			<time>${data.lengthTime}</time>
			<ul class="ingredients">
				${data.ingredients.split(',').map(ing => `<li>${ing.trim()}</li>`).join('')}
			</ul>
		`;
	}
}

// A8. Define the custom element
customElements.define('recipe-card', RecipeCard);
