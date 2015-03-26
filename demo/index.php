<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gridilydidily</title>
    <meta name="description" content="A flexbox grid with inline-block fallback.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
    <script type="text/javascript" src="js/modernizr.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Source+Code+Pro|Roboto:400,500,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/style.css">
    <!--[if lt IE 9]><!-->
    <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
    <!--<![endif]-->
</head>
<body>

<header class="header">
  <h1>Gridilydidily</h1>
  <h3>A flexbox grid with inline-block fallback</h3>
</header>

<main class="main">

  <section class="demo">

    <div class="demo-grid">
      <div class="grid medium--grid--wide">
        <div class="grid-item small--1-8">
          <div class="demo-item">
            1/8
          </div>
        </div>
        <div class="grid-item small--7-8">
          <div class="demo-item">
            7/8
          </div>
        </div>
        <div class="grid-item small--2-8">
          <div class="demo-item">
            2/8
          </div>
        </div>
        <div class="grid-item small--6-8">
          <div class="demo-item">
            6/8
          </div>
        </div>
        <div class="grid-item small--3-8">
          <div class="demo-item">
            3/8
          </div>
        </div>
        <div class="grid-item small--5-8">
          <div class="demo-item">
            5/8
          </div>
        </div>
        <div class="grid-item small--4-8">
          <div class="demo-item">
            4/8
          </div>
        </div>
        <div class="grid-item small--4-8">
          <div class="demo-item">
            4/8
          </div>
        </div>
        <div class="grid-item small--5-8">
          <div class="demo-item">
            5/8
          </div>
        </div>
        <div class="grid-item small--3-8">
          <div class="demo-item">
            3/8
          </div>
        </div>
        <div class="grid-item small--6-8">
          <div class="demo-item">
            6/8
          </div>
        </div>
        <div class="grid-item small--2-8">
          <div class="demo-item">
            2/8
          </div>
        </div>
        <div class="grid-item small--7-8">
          <div class="demo-item">
            7/8
          </div>
        </div>
        <div class="grid-item small--1-8">
          <div class="demo-item">
            1/8
          </div>
        </div>
        <div class="grid-item small--4-8">
          <div class="grid medium--grid--wide">
            <div class="grid-item small--4-8">
              <div class="demo-item">
                And this
              </div>
            </div>
            <div class="grid-item small--4-8">
              <div class="demo-item">
                is nested!
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item small--4-8">
          <div class="demo-item">
            Wow.
          </div>
        </div>
        <div class="grid-item default--6-8 default--push--2-8">
          <div class="demo-item">
            pushed
          </div>
        </div>
      </div>
    </div>

    <div class="demo-description">

<h3>General usage</h3>

<p>
  This grid system is mobile first. Naming should be self-explanatory. The default classes specify the width if no breakpoint will match. Leave these classes away and the item will take full width.
</p>

<pre><?= htmlspecialchars('
<div class="grid">

  <div class="grid-item default--2-8 small--3-8 large--4-8">
    ...
  </div>

  <div class="grid-item default--6-8 small--5-8 large--4-8">
    ...
  </div>

</div>
') ?>
</pre>

    </div>

  </section>

  <h2>Grid Modifier</h2>

  <section class="demo">
    <h3>.grid--reverse</h3>

    <div class="demo-grid">
      <div class="grid grid--reverse">
        <div class="grid-item default--5-12">
          <div class="demo-item">
            first
          </div>
        </div>
        <div class="grid-item default--4-12">
          <div class="demo-item">
            second
          </div>
        </div>
        <div class="grid-item default--3-12">
          <div class="demo-item">
            third
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--wide</h3>

    <div class="demo-grid">
      <div class="grid grid--wide">
        <div class="grid-item default--1-4">
          <div class="demo-item">
            yo
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            mama
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            is so
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            wide
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--narrow</h3>

    <div class="demo-grid">
      <div class="grid grid--narrow">
        <div class="grid-item default--1-4">
          <div class="demo-item">
            this
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            is
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            so
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            tight
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--center</h3>

    <div class="demo-grid">
      <div class="grid grid--center">
        <div class="grid-item default--1-3">
          <div class="demo-item">
            such middle. so center.
          </div>
        </div>
        <div class="grid-item default--1-3">
          <div class="demo-item">
            wow.
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--right</h3>

    <div class="demo-grid">
      <div class="grid grid--right">
        <div class="grid-item default--1-4">
          <div class="demo-item">
            all
          </div>
        </div>
        <div class="grid-item default--1-4">
          <div class="demo-item">
            right
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--middle</h3>

    <div class="demo-grid">
      <div class="grid grid--middle">
        <div class="grid-item small--1-3">
          <div class="demo-item">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--bottom</h3>

    <div class="demo-grid">
      <div class="grid grid--bottom">
        <div class="grid-item small--1-3">
          <div class="demo-item">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--equal</h3>

    <div class="demo-grid">
      <div class="grid grid--equal">
        <div class="grid-item small--1-3">
          <div class="demo-item">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item">
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--between</h3>

    <div class="demo-grid">
      <div class="grid grid--between">
        <div class="grid-item small--3-12">
          <div class="demo-item">
            there is
          </div>
        </div>
        <div class="grid-item small--3-12">
          <div class="demo-item">
            something
          </div>
        </div>
        <div class="grid-item small--3-12">
          <div class="demo-item">
            between us
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h3>.grid--around</h3>

    <div class="demo-grid">
      <div class="grid grid--around">
        <div class="grid-item small--3-12">
          <div class="demo-item">
            take
          </div>
        </div>
        <div class="grid-item small--3-12">
          <div class="demo-item">
            a look
          </div>
        </div>
        <div class="grid-item small--3-12">
          <div class="demo-item">
            around
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="demo">
    <h2>Helper classes</h2>

    <h3>.grid-item__fill</h3>

    <p>
      This is useful for creating equal height boxes with buttons at the same height.
    </p>

    <div class="demo-grid">
      <div class="grid">
        <div class="grid-item small--1-3">
          <div class="demo-item grid-item__fill-wrapper">
            <img src="//nosrc.io/400X300" />
            <p class="grid-item__fill">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <button>button</button>
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item grid-item__fill-wrapper">
            <img src="//nosrc.io/400X300" />
            <p class="grid-item__fill">
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <button>button</button>
          </div>
        </div>
        <div class="grid-item small--1-3">
          <div class="demo-item grid-item__fill-wrapper">
            <img src="//nosrc.io/400X300" />
            <p class="grid-item__fill">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <button>button</button>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-description">

<pre><?= htmlspecialchars('
<div class="grid">
  <div class="grid-item">
    <div class="grid-item__fill-wrapper">
      <img src="//nosrc.io/400X300" />
      <p class="grid-item__fill">
        Lorem ipsum dolor sit amet...
      </p>
      <button>button</button>
    </div>
  </div>
</div>
') ?>
</pre>

    </div>

  </section>

  <section class="demo">

<h2>Options</h2>

<p>
  This is how you have to set breakpoints.
</p>

<pre>
$grid-breakpoints: (
  'small': 'only screen and (min-width: 400px)',
  'medium': 'only screen and (min-width: 700px)',
  'large': 'only screen and (min-width: 1200px)'
);
</pre>

<p>
  If you don't like the naming of the default classes you can rename them. Or you can completely disable them if your breakpoints match all possibilities.
</p>

<pre>
$grid-default: true;
$grid-default-modifier: 'default';
</pre>

<p>
  Whoot. Only 8ths? Nope. You can generate whatever you want.
</p>

<pre>
$grid-bases: (
  2,
  3,
  4,
  8,
  12
);
</pre>

<p>
  Set your gutter width. Additionally you can create as many gutters you need. You should use px, em, or rem here (no %).
</p>

<pre>
$grid-gutter-default: 10px;
$grid-gutters: (
  'wide': 20px,
  'narrow': 0px
);
</pre>

<p>
  Use these gutters horizontal AND vertical?
</p>

<pre>
$grid-gutter-vertical: true;
</pre>

<p>
  Here comes magic. At different breakpoints you can use different gutters.
</p>

<pre>
$grid-gutter-breakpoints: true;
</pre>
<pre><?= htmlspecialchars('
<div class="grid grid--wide large--grid--narrow">
  ...
</div>
') ?>
</pre>

<p>
  Enable or disable breakpoint modifiers for all grid modifiers (reverse, center, right, middle, bottom, equal, between, around).
</p>

<pre>
$grid-modifier-breakpoints: true;
</pre>

<p>
  Gridilydidily comes with an inline-block fallback for older browsers. Remove all whitespace between your grid-items or enable the fallback markup fix. You'll need Modernizr for this feature!
</p>

<pre>
$grid-fallback: true;
$grid-fallback-markup-fix: true;
</pre>

<p>
  Enable or disable push classes and its breakpoint modifiers.
</p>

<pre>
$grid-push: true;
$grid-push-breakpoints: true;
</pre>

<p>
  Enable or disable pull classes and its breakpoint modifiers.
</p>

<pre>
$grid-pull: true;
$grid-pull-breakpoints: true;
</pre>

<p>
  TL;DR – here is a list of all defaults.
</p>

<pre>
$grid-breakpoints: (
  'small': 'only screen and (min-width: 400px)',
  'medium': 'only screen and (min-width: 700px)',
  'large': 'only screen and (min-width: 1200px)'
);

$grid-modifier-breakpoints: true;

$grid-bases: (
  2,
  3,
  4,
  8,
  12
);

$grid-gutter-default:       10px;
$grid-gutters: (
  'wide': 20px,
  'narrow': 0px
);
$grid-gutter-breakpoints:   true;
$grid-gutter-vertical:      true;

$grid-default:              true;
$grid-default-modifier:     'default';

$grid-fallback:             true;
$grid-fallback-markup-fix:  true;

$grid-push:                 true;
$grid-push-breakpoints:     true;

$grid-pull:                 true;
$grid-pull-breakpoints:     true;
</pre>

  </section>

</main>

<footer class="footer">
Oh god why. <a href="http://www.philipp-kuehn.com/impressum/" target="_blank">Imprint</a>
</footer>

</body>
</html>