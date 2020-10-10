import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const pizzasTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: pizzasTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function turnBeersIntoPages({ graphql, actions }) {
  const beersTemplate = path.resolve('./src/pages/beer.js');
  const { data } = await graphql(`
  query{
    beers: allBeers{
      nodes:{
        name
        rating
        price
        image
      }
    }
  }
  `);
  data.beers.nodes.forEach((beer) => {
    actions.createPage({
      path: beersTemplate,
      context: {
        beer,
      },
    });
  });
}

async function turnSlicemastersIntoPages({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      persons: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.persons.totalCount / pageSize);
  // create pages for pagination
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });

  // create individual pages
  data.persons.nodes.forEach((person) => {
    actions.createPage({
      path: `/slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: person.slug.current,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  for (const beer of beers) {
    // create a nodeMeta for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  // fetch list of beers and source them into our gatsby API;
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}
