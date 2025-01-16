# Just One T-Shirt Designer

## Development Preview States

You can preview different states of the application by adding URL parameters:

- Product Ready State: `?preview=product-ready`
- Processing State: `?preview=processing`
- Error State: `?preview=error`

Examples:
```
http://localhost:5173/?preview=product-ready
http://localhost:5173/?preview=processing
http://localhost:5173/?preview=error
```

These preview states are only available in development and won't affect the production environment.