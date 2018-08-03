# iFrames

Fancy comes with a special `FrameProvider` enables _any_ child Fancy styled component to render styles within the iFrame.

### Example

```jsx
<Frame>
  <FrameProvider>
    <StyledCard />
  </FrameProvider>
</Frame>
```

If you use the **same** component outside the iFrame, as long as the `FrameProvider` is present, the correct styles will generate.

```jsx
<App>
  <StyledCard />
  <Frame>
    <FrameProvider>
      <StyledCard />
    </FrameProvider>
  </Frame>
</App>
```

## See also

* [Scoping](https://github.com/helpscout/fancy/tree/a901a54d4ef8493038992d182d4bc28995839c3b/docs/Scoping.md)
* [Theming](theming.md)

