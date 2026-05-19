# 🎓 Linear Regression: Gradient Descent & Normal Equations

## 📋 Summary

This lecture introduces **linear regression** — the simplest supervised learning algorithm. We cover how to represent hypotheses, define cost functions, and optimize parameters using **batch gradient descent**, **stochastic gradient descent (SGD)**, and the **normal equations** (closed-form solution). Key notation and matrix calculus foundations are established for the rest of the course.

---

## 🏠 Motivation: Predicting House Prices

| Feature | Description |
|---------|-------------|
| `x₁` | Size of house (sq ft) |
| `x₂` | Number of bedrooms |
| `y` | Price ($ thousands) |

**Goal**: Given training data of houses, learn a function `h(x)` that predicts price for new houses.

---

## 📝 Key Notation

| Symbol | Meaning |
|--------|---------|
| `m` | Number of training examples |
| `n` | Number of features |
| `x⁽ⁱ⁾` | Input features of i-th training example |
| `y⁽ⁱ⁾` | Target output of i-th training example |
| `θ` | Parameters (weights) of the model |
| `h_θ(x)` | Hypothesis function (prediction) |
| `J(θ)` | Cost function to minimize |

---

## 🔧 Hypothesis Representation

### Single Feature
$$h_\theta(x) = \theta_0 + \theta_1 x_1$$

### Multiple Features (with dummy feature `x₀ = 1`)
$$h_\theta(x) = \sum_{j=0}^{n} \theta_j x_j = \theta^T x$$

Where:
- `x₀ = 1` (intercept term)
- `x₁` = size, `x₂` = bedrooms, etc.

---

## 📉 Cost Function: Mean Squared Error

$$J(\theta) = \frac{1}{2} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

> **Why ½?** Cancels with the 2 from differentiation — makes math cleaner.

---

## 🔄 Optimization Algorithms

### 1️⃣ Batch Gradient Descent

**Update rule** (for each parameter `θⱼ`):

$$\theta_j := \theta_j - \alpha \frac{\partial J(\theta)}{\partial \theta_j}$$

**Full derivative** (sum over ALL training examples):

$$\frac{\partial J}{\partial \theta_j} = \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

| Pros | Cons |
|------|------|
| Stable convergence | **Slow** on large datasets — must scan all `m` examples per step |
| Guaranteed to find global minimum for convex functions | Memory intensive for huge data |

**Visualization**: Descending a bowl-shaped surface — each step goes directly downhill (orthogonal to contour lines).

---

### 2️⃣ Stochastic Gradient Descent (SGD)

**Update rule** (one training example at a time):

```
For i = 1 to m:
    For j = 0 to n:
        θⱼ := θⱼ - α(h_θ(x⁽ⁱ⁾) - y⁽ⁱ⁾) · xⱼ⁽ⁱ⁾
```

| Pros | Cons |
|------|------|
| **Fast** — no need to scan full dataset | Noisy, oscillating path |
| Works with streaming/infinite data | Never fully converges (hovers near minimum) |
| Scales to massive datasets | Requires tuning learning rate decay |

> 💡 **Pro tip**: Decrease `α` over time to reduce oscillation near optimum.

---

### 📊 Batch vs. SGD Comparison

| Aspect | Batch GD | SGD |
|--------|----------|-----|
| Update per step | All `m` examples | 1 example |
| Convergence | Smooth, direct | Noisy, wandering |
| Speed per iteration | Slow | Fast |
| Best for | Small datasets (`m < ~10K`) | Large datasets, online learning |
| Typical `α` | ~0.01 (scaled features) | Larger than batch, empirical |

---

## 🎯 The Normal Equations (Closed-Form Solution)

For **linear regression only**, we can solve for optimal `θ` directly — no iterations needed!

### Matrix Setup

- **Design matrix** `X` (`m × (n+1)`): Stack all training examples as rows
- **Target vector** `y` (`m × 1`): All outputs stacked
- **Parameters** `θ` (`(n+1) × 1`)

### Cost in Matrix Form
$$J(\theta) = \frac{1}{2}(X\theta - y)^T(X\theta - y)$$

### Take Derivative, Set to Zero

$$\nabla_\theta J(\theta) = X^T X \theta - X^T y = 0$$

### ✅ Normal Equation Solution

$$\boxed{\theta = (X^T X)^{-1} X^T y}$$

> ⚠️ If `X^T X` is non-invertible: features are linearly dependent (redundant). Use pseudoinverse or remove duplicate features.

---

## 🧠 Key Takeaways

| Concept | Key Insight |
|---------|-------------|
| **Hypothesis** | Linear (affine) function of features |
| **Cost function** | Sum of squared errors — convex bowl shape |
| **Batch GD** | Reliable but slow; scans all data per step |
| **SGD** | Fast, scalable; noisy but practical for big data |
| **Normal Equations** | One-shot solution for linear regression only |

---

## ✅ Action Items / Checklist

- [ ] Implement batch gradient descent from scratch
- [ ] Implement SGD and compare convergence behavior
- [ ] Derive the normal equations using matrix calculus (see lecture notes)
- [ ] Experiment with learning rate `α`: try `[0.001, 0.01, 0.1, 1]`
- [ ] Verify that feature scaling helps gradient descent converge faster
- [ ] Check: is `X^T X` invertible? If not, debug feature redundancy

---

## 🔮 Preview: What's Next?

- **Generalized Linear Models** (GLMs) — why squared error? Gaussian assumptions
- **Classification** — when `y` is discrete (next Monday!)
- **Neural Networks** — non-linear hypotheses requiring iterative optimization