# migration-1x-2x

Updates in `v2.0.0` will most definitely break previous implementations of Fancy.

## Let's get Emotional 👩‍🎤

Under the hood, v2.0.0 is now running an enhanced "fork" of [Emotion](https://github.com/emotion-js/emotion). Previously, Fancy's internals was a custom from-scratch implementation that worked very similarly as Styled Components/Emotions and CSS Modules.

Fancy was originally created to be a super tiny CSS-Modules client-side compiler. This worked wonderfully! After implementation, we realized that Fancy _needed_ to support:

* Scoping
* Theming
* iFrame support \(out-of-the-box\)

Fancy v1.x did support these features, but they weren't reliable. This is because the core CSS processing functionally for something like CSS Modules is very different compared to something like Styled Components \(with theming\).

Rather than reverse engineer things to make it fit, it was decided that v2.x would use Emotion.

## Enhance! 🤳

As of today, Emotion supports _none_ of the \(above\) requirements we need. It also does not provide any way of implementing these features without touching core code.

v2.0.0's implementation of Emotion involves copying over only the necessary files and modifying only the necessary lines to add these features. This allows for us to more easily sync up with the Emotion library, if we ever need to.

## Changes 😱

Check out [Emotion's documentation](https://emotion.sh/) to see how the `styled` function can be used.

Previously CSS Modules-like implementations of Fancy is no longer supported in v2.0.0.

