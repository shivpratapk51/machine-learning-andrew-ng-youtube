# 🎓 Linear Regression: From First Principles to Solutions

## 📋 Summary

This lecture introduces **linear regression** — the simplest supervised learning algorithm — covering three methods to fit models: **batch gradient descent**, **stochastic gradient descent**, and the **normal equations** (closed-form solution). Key notation and concepts established here form the foundation for all subsequent algorithms in the course.

---

## 🏠 Motivation: Predicting House Prices

| Feature | Description |
|---------|-------------|
| **X₁** | Size of house (square feet) |
| **X₂** | Number of bedrooms |
| **Y** | Price (in thousands of dollars) |

> **Example:** A 2,104 sq ft house priced at $400,000

**Goal:** Given training data, learn a function that predicts price for new, unseen houses.

---

## 🔑 Core Notation (Used Throughout the Course)

| Symbol | Meaning |
|--------|---------|
| **m** | Number of training examples |
| **n** | Number of features |
| **x⁽ⁱ⁾, y⁽ⁱ⁾** | i-th training example (superscript = index, not exponent) |
| **xⱼ** | j-th feature |
| **θ** | Parameters (weights) of the model |
| **h_θ(x)** | Hypothesis function — predicts output given input |

---

## 📐 The Hypothesis Function

### Single Feature (Univariate)
$$h_\theta(x) = \theta_0 + \theta_1 x$$

### Multiple Features (Multivariate)
$$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + ... + \theta_n x_n$$

### Compact Vector Form
$$h_\theta(x) = \sum_{j=0}^{n} \theta_j x_j = \theta^T x$$

> 💡 **Trick:** Define $x_0 = 1$ (dummy feature) so that $\theta_0$ acts as the intercept term.

---

## 💰 The Cost Function (Ordinary Least Squares)

**Objective:** Choose θ so that predictions are close to actual values.

$$J(\theta) = \frac{1}{2} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

| Component | Purpose |
|-----------|---------|
| $(h_\theta(x^{(i)}) - y^{(i)})^2$ | Squared error for one example |
| $\sum_{i=1}^{m}$ | Sum over all training examples |
| $\frac{1}{2}$ | Convenience constant (simplifies derivatives) |

> **Why squared error?** Justified later via **Generalized Linear Models** (Gaussian assumption). Alternative error metrics (absolute, power-4) lead to different algorithms.

---

## 🔄 Method 1: Batch Gradient Descent

### Core Idea
Iteratively adjust θ to walk downhill on the cost surface until reaching the minimum.

### Update Rule
$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$$

### Full Algorithm
$$\theta_j := \theta_j - \alpha \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

**For j = 0, 1, ..., n (all parameters simultaneously)**

### ⚡ Learning Rate (α) Guidelines

| α too small | α too large | α "just right" |
|-------------|-------------|----------------|
| Slow convergence | Overshoots, may diverge | Steady decrease in J(θ) |
| Needs many iterations | J(θ) increases instead of decreasing | Efficient convergence |

> **Practical tip:** Try values on exponential scale: 0.001, 0.003, 0.01, 0.03, 0.1, 0.3...

### 🎯 Key Property for Linear Regression
The cost function J(θ) is a **convex bowl** — no local optima, only a **single global minimum**.

---

## ⚡ Method 2: Stochastic Gradient Descent (SGD)

### The Problem with Batch GD
- Each update requires scanning **all m examples**
- For m = 100M+, this is prohibitively slow

### SGD Update Rule
For each training example i = 1 to m:
$$\theta_j := \theta_j - \alpha \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

### 🔄 Batch vs. Stochastic Comparison

| Aspect | Batch Gradient Descent | Stochastic Gradient Descent |
|--------|------------------------|----------------------------|
| **Update per** | Full dataset (all m examples) | Single example |
| **Path to minimum** | Smooth, direct | Noisy, zig-zagging |
| **Convergence** | Reaches global minimum | Oscillates near minimum |
| **Speed per step** | Slow (scans all data) | Fast (one example) |
| **Best for** | Small datasets (m < 10K) | Large datasets (m very large) |

### 🛠️ Practical SGD Tips
- **Decrease learning rate over time** → smaller oscillations, closer to optimum
- **Monitor J(θ) over time** → stop when plateaued
- **Mini-batch GD** (intermediate): Use ~100 examples per step

---

## 🧮 Method 3: Normal Equations (Closed-Form Solution)

### The Big Idea
For linear regression specifically, solve for θ directly — **no iterations needed**.

### Matrix Setup

| Matrix/Vector | Definition | Dimensions |
|---------------|-----------|------------|
| **Design Matrix X** | Stack all training examples as rows | m × (n+1) |
| **Target vector y** | Stack all outputs | m × 1 |
| **Parameter vector θ** | Parameters to find | (n+1) × 1 |

### Derivation Sketch
1. Express J(θ) in matrix form:
   $$J(\theta) = \frac{1}{2}(X\theta - y)^T(X\theta - y)$$

2. Take derivative with respect to θ, set to 0

3. Solve:

$$\boxed{\theta = (X^T X)^{-1} X^T y}$$

### ✅ Advantages & ❌ Limitations

| ✅ Advantages | ❌ Limitations |
|-------------|--------------|
| One-step solution (no iterations) | Only works for **linear regression** |
| No learning rate to tune | Computing inverse: O(n³) — slow for many features |
| Exact global optimum | XᵀX may be non-invertible (redundant features) |
| | Doesn't scale to truly massive datasets |

> **When XᵀX is non-invertible:** Use pseudo-inverse, or better — find and remove linearly dependent features.

---

## 📊 Visual Summary: Three Approaches to Fit Linear Regression

```
┌─────────────────────────────────────────────────────────┐
│                    LINEAR REGRESSION                      │
│              "How do we find optimal θ?"                │
├─────────────────────────────────────────────────────────┤
│  🔄 BATCH GD        │  ⚡ STOCHASTIC GD    │  🧮 NORMAL EQ     │
│  ─────────────────   │  ─────────────────   │  ───────────────  │
│  Repeat:            │  For each example:   │  θ = (XᵀX)⁻¹Xᵀy  │
│    θ := θ - α∇J(θ)  │    θ := θ - α∇Jᵢ(θ) │                    │
│  (sum over all m)    │  (single example)    │  ONE SHOT          │
├─────────────────────────────────────────────────────────┤
│  Best: Small data    │  Best: Big data      │  Best: Medium data │
│  Slow per step       │  Fast per step       │  n < ~10,000       │
│  Fewer iterations    │  Many iterations     │  No tuning needed  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Takeaways & Action Items

| # | Action |
|---|--------|
| 1 | **Master the notation** — you'll see x⁽ⁱ⁾, θ, h_θ(x), J(θ) in every algorithm this quarter |
| 2 | **Understand when to use each method** — dataset size is the key deciding factor |
| 3 | **Implement gradient descent yourself** — feel the difference between batch and stochastic |
| 4 | **Read lecture notes for full normal equation derivation** — matrix calculus practice |
| 5 | **Problem Set 1** — apply these derivations to concrete problems |

---

## 🔮 Preview: What's Next

- **Next Monday:** Classification (discrete Y, not continuous)
- **Next week:** Generalized Linear Models — justifies why squared error is "right"
- **Later:** Neural networks, where gradient descent is *essential* (no closed form)