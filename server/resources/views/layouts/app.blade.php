<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >
  <title>{{ config('app.name', 'Gurt') }}</title>
  <link
    href="https://fonts.googleapis.com"
    rel="preconnect"
  >
  <link
    href="https://fonts.gstatic.com"
    rel="preconnect"
    crossorigin
  >
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  >

  <style>
    :root {
      --color-primary: #1e81f8;
    }

    body,
    html {
      font-family: 'Montserrat', sans-serif;
    }

    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 5%;
    }
  </style>

</head>

<body>
  <div>
    <main class="main">
      @yield('content')
    </main>
  </div>
</body>

</html>
