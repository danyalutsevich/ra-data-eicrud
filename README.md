# ra-data-eicrud

`ra-data-eicrud` is a **data provider** for integrating the **EiCRUD backend** with the **React Admin frontend**. This library leverages EiCRUD’s powerful backend services and uses the **Super Client** to handle API requests seamlessly.

---

## Features

- Easy integration between React Admin and EiCRUD backend.
- Handles CRUD operations (Create, Read, Update, Delete) efficiently.
- Supports React Admin’s data provider interface.
- Works with the **Super Client** for consistent API communication.

---

## Installation

You can install the library via npm:

```bash
npm install ra-eicrud-dataprovider
```

## Usage

To use the library, you need to create an instance of the `EiCRUDDataProvider` class and pass it to the `DataProvider` component of React Admin. Here's an example:

```jsx
// client.ts
import { SuperClient } from "../../eicrud_exports/super_client";

export const sp = new SuperClient({ url: "http://localhost:3000" });

...

// App.tsx
import { sp } from "./client";
import EicrudDataProvider from "ra-eicrud-dataprovider";

function App() {
  const provider = EicrudDataProvider(sp);

  return (
    <Admin dataProvider={provider}>
      <Resource
        name="blog"
        list={<BlogList />}
        create={<BlogCreate />}
        show={<BlogShow />}
        edit={<BlogEdit />}
      />
    </Admin>
  );
}
```
