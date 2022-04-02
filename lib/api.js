async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getHomepage() {
  const data = await fetchAPI(
    `
      query getHomepage {
        page(where: { slug: "/" }) {
          title
          subtitle
          images {
            id
            url
            width
            height
          }
        }
      }
    `,
  );

  return data;
}

export async function getMenuPage() {
  const data = await fetchAPI(
    `
      query getMainMenu {
        page(where: { slug: "menu" }) {
          title
          subtitle
        }
        menu(where: { menuName: "Main Menu" }) {
          menuName
          menuItems {
            id
            name
            description
            containsNuts
            ingredients
            pricing {
              name
              pricePerDozen
              pricePerHalfDozen
              pricePerSingle
            }
            images {
              url(transformation: {image: {resize: {width: 200}}})
            }
          }
        }
      }
    `,
  );

  return data;
}

export async function getOrderPage() {
  const data = await fetchAPI(
    `
      query getMainMenu {
        page(where: { slug: "order" }) {
          title
          subtitle
        }
        menu(where: { menuName: "Main Menu" }) {
          menuName
          menuItems {
            id
            name
            description
            containsNuts
            ingredients
            pricing {
              name
              pricePerDozen
              pricePerHalfDozen
              pricePerSingle
            }
            images {
              url(transformation: {image: {resize: {width: 200}}})
            }
          }
        }
      }
    `,
  );

  return data;
}
