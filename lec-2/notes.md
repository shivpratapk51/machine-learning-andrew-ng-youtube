# 🎯 Linear Regression: From First Principles to Normal Equations

## 📋 Summary

This lecture introduces **linear regression** — the foundational supervised learning algorithm. We explore how to predict continuous outputs (like house prices) by fitting linear models, covering **batch gradient descent**, **stochastic gradient descent**, and the **normal equations** as three approaches to find optimal parameters.

---

## 🏠 Motivation: Predicting House Prices

| Feature | Description |
|---------|-------------|
| `x₁` | Size of house (square feet) |
| `x₂` | Number of bedrooms |
| `y` | Price (in thousands of dollars) |

> **Key Insight:** Linear regression finds the best-fitting straight line (or hyperplane) through data points to make predictions on unseen data.

---

## 🧮 Core Notation

| Symbol | Meaning |
|--------|---------|
| `m` | Number of training examples |
| `n` | Number of features |
| `x⁽ⁱ⁾, y⁽ⁱ⁾` | i-th training example |
| `xⱼ` | j-th feature |
| `θ` | Parameters (weights) |
| `h_θ(x)` | Hypothesis function — our prediction |

### Hypothesis Representation

**Single feature:**
$$h_\theta(x) = \theta_0 + \theta_1 x_1$$

**Multiple features (with `x₀ = 1` for bias):**
$$h_\theta(x) = \sum_{j=0}^{n} \theta_j x_j = \theta^T x$$

---

## 💰 The Cost Function: Measuring Error

We minimize **squared error** — the foundation of ordinary least squares:

$$J(\theta) = \frac{1}{2} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

> 🤔 **Why ½?** Cancels with the 2 when taking derivatives — pure mathematical convenience!

---

## 🏔️ Gradient Descent: Iterative Optimization

### The Core Update Rule

$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$$

Where `α` = **learning rate** (step size)

### Visual Intuition

```
        🏔️ Cost Surface J(θ)
           ╲
            ╲    ← Start here (random initialization)
             ╲      ↘
              ╲        ↘  ← Follow steepest descent
               ╲           ↘
                🎯 Global Minimum (for linear regression!)
```

### ✅ Batch Gradient Descent

**Algorithm:** Sum over ALL training examples each step

$$\theta_j := \theta_j - \alpha \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

| Pros | Cons |
|------|------|
| Stable convergence | Slow on massive datasets |
| Guaranteed to find minimum | Must scan entire dataset per step |

---

## ⚡ Stochastic Gradient Descent (SGD)

**Algorithm:** Update using ONE training example at a time

$$\text{For } i = 1 \text{ to } m:$$
$$\quad \theta_j := \theta_j - \alpha \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

```
Batch GD:    🐢 Smooth, direct path to minimum
SGD:         🐝 Noisy, zigzag path — but much faster per step!
```

| Batch GD | Stochastic GD |
|----------|---------------|
| Uses all `m` examples per update | Uses 1 example per update |
| Slow per iteration, fast convergence | Fast per iteration, noisy convergence |
| Best for small datasets (`m < 10,000`) | Essential for big data (`m > 1,000,000`) |
| Parameters settle at minimum | Parameters oscillate near minimum |

> 💡 **Pro Tip:** Decay learning rate over time to reduce oscillation in SGD!

---

## 🚀 The Normal Equations: One-Step Solution

For **linear regression only**, we can solve directly — no iterations needed!

### Matrix Formulation

Define the **design matrix** `X` (stack all training examples as rows):

$$X = \begin{bmatrix} — (x^{(1)})^T — \\ — (x^{(2)})^T — \\ \vdots \\ — (x^{(m)})^T — \end{bmatrix}, \quad \vec{y} = \begin{bmatrix} y^{(1)} \\ y^{(2)} \\ \vdots \\ y^{(m)} \end{bmatrix}$$

### Cost Function in Matrix Form

$$J(\theta) = \frac{1}{2}(X\theta - \vec{y})^T(X\theta - \vec{y})$$

### The Closed-Form Solution

> **Set derivative to zero and solve:**

$$\nabla_\theta J(\theta) = X^T X \theta - X^T \vec{y} = 0$$

$$\boxed{\theta = (X^T X)^{-1} X^T \vec{y}}$$

✨ **Boom!** Global optimum in one matrix operation.

---

## 📊 Algorithm Comparison

| Method | Speed | Data Size | When to Use |
|--------|-------|-----------|-------------|
| **Batch Gradient Descent** | Slow per step | Small-medium | Clean, stable convergence |
| **Stochastic GD** | Fast per step | Large/Very Large | Big data, online learning |
| **Normal Equations** | Instant (theoretically) | Small-medium | Linear regression only, `n` not too large |

---

## ✅ Checklist: Implementing Linear Regression

- [ ] Collect dataset with features `X` and targets `y`
- [ ] Add `x₀ = 1` bias term to all examples
- [ ] **Choose approach:**
  - [ ] Normal equations: `(XᵀX)⁻¹Xᵀy` (if `m` small, `n` moderate)
  - [ ] Batch GD (if clean convergence needed)
  - [ ] SGD (if dataset massive)
- [ ] Set learning rate `α` (try `0.01`, scale up/down by ~3×)
- [ ] Monitor cost `J(θ)` — should decrease!
- [ ] Verify convergence (parameters stop changing, cost plateaus)

---

## 🎯 Key Takeaways

| 💡 | Insight |
|----|---------|
| **Linear regression** is the simplest supervised learning algorithm — but its structure (hypothesis, cost, optimization) generalizes to far more complex models |
| **Gradient descent** is universal — you'll see it again for neural networks, logistic regression, and beyond |
| **SGD vs Batch** is a fundamental trade-off: accuracy vs. speed |
| **Normal equations** are a special-case shortcut — elegant, but don't generalize to most other algorithms |

> 🏁 **Bottom Line:** Master these foundations — notation, cost functions, and optimization — and you've built the scaffolding for almost every algorithm in machine learning.