@extends('layouts.app')

<style>
  .content {
    text-align: center
  }

  .link {
    display: block;
    color: var(--color-primary);
  }
</style>

@section('content')
  <div class="content">
    <x-application-logo></x-application-logo>
    <h1>
      Email has been successfully verified!
    </h1>
    <a
      class="link"
      href="{{ config('app.frontend_url') }}"
    >Go to account</a>
  </div>
@endsection
