# Linear Regression: Gradient Descent and the Normal Equations

## Summary

This lecture introduces **linear regression**, one of the simplest and most widely used supervised learning algorithms. The instructor covers: (1) the formal setup of linear regression with notation and hypothesis representation; (2) the **cost function** (mean squared error) to measure prediction quality; (3) **batch gradient descent** and **stochastic gradient descent** as iterative methods to minimize the cost; and (4) the **normal equations**, a closed-form solution that directly computes the optimal parameters for linear regression without iteration.

---

## 1. Supervised Learning & Regression Setup

### Key Concepts
| Term | Definition |
|------|-----------|
| **Supervised learning** | Given input-output pairs (X, Y), learn a mapping from X to Y |
| **Regression** | Output Y is continuous (vs. classification where Y is discrete) |
| **Training set** | Dataset of m examples used to train the model |
| **Hypothesis h(x)** | Function output by the learning algorithm to make predictions |

### Example: Predicting House Prices
- **Input feature (X):** Size of house in square feet
- **Target variable (Y):** Price in thousands of dollars
- **Goal:** Fit a straight line to predict price from size

---

## 2. Notation and Hypothesis Representation

### Standard Notation Used Throughout the Course

| Symbol | Meaning |
|--------|---------|
| m | Number of training examples |
| n | Number of features |
| x⁽ⁱ⁾, y⁽ⁱ⁾ | i-th training example (superscript i = index, not exponentiation) |
| xⱼ | j-th feature of input x |
| θ (theta) | Parameters of the model |
| h_θ(x) | Hypothesis function parameterized by θ |

### Hypothesis for Linear Regression

**Single feature:**
$$h_\theta(x) = \theta_0 + \theta_1 x$$

**Multiple features (n features):**
$$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + ... + \theta_n x_n = \sum_{j=0}^{n} \theta_j x_j$$

### Simplified Notation with Dummy Feature x₀ = 1

To write the hypothesis compactly as a dot product:
- Define **x₀ = 1** (dummy feature, always 1)
- Then: **h_θ(x) = θᵀx** where both θ and x are (n+1)-dimensional vectors

---

## 3. Cost Function: Mean Squared Error

### Definition
$$J(\theta) = \frac{1}{2} \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right)^2$$

### Key Points
- Measures how far predictions h_θ(x⁽ⁱ⁾) are from true values y⁽ⁱ⁾
- Squared error penalizes large deviations more heavily
- The ½ factor simplifies derivative calculations later
- **Goal:** Find θ that minimizes J(θ)

---

## 4. Gradient Descent

### Core Idea
Iteratively adjust parameters θ to reduce J(θ) by moving in the direction of steepest descent.

### Update Rule
$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$$

Where:
- **α (alpha)** = learning rate (step size)
- **∂J/∂θⱼ** = partial derivative (direction of steepest descent)

### Derivative Calculation (for one example)
$$\frac{\partial}{\partial \theta_j} J(\theta) = (h_\theta(x) - y) \cdot x_j$$

### Full Update (all m examples — Batch Gradient Descent)
$$\theta_j := \theta_j - \alpha \sum_{i=1}^{m} \left( h_\theta(x^{(i)}) - y^{(i)} \right) x_j^{(i)}$$

---

## 5. Batch vs. Stochastic Gradient Descent

| Aspect | Batch Gradient Descent | Stochastic Gradient Descent (SGD) |
|--------|------------------------|-----------------------------------|
| **Update per step** | Uses **all m** examples | Uses **one** example at a time |
| **Update rule** | θⱼ := θⱼ − α∑ᵢ(h_θ(x⁽ⁱ⁾) − y⁽ⁱ⁾)xⱼ⁽ⁱ⁾ | θⱼ := θⱼ − α(h_θ(x⁽ⁱ⁾) − y⁽ⁱ⁾)xⱼ⁽ⁱ⁾ |
| **Convergence** | Smooth convergence to global minimum | Noisy path; oscillates near minimum |
| **Speed per iteration** | Slow (must scan entire dataset) | Fast (one example per update) |
| **Best for** | Small to medium datasets (thousands of examples) | Large datasets (millions+ of examples) |
| **Practical use** | Simpler, fewer tuning concerns | Essential for big data; can decrease α over time |

### Practical Guidance
- **Small dataset** (~hundreds to thousands): Use **batch gradient descent**
- **Large dataset** (millions+): Use **stochastic gradient descent**
- **Learning rate α:** Start at 0.01 (with scaled features), try values on exponential scale (0.01, 0.02, 0.04, 0.08...)

---

## 6. Normal Equations (Closed-Form Solution)

For **linear regression only**, we can solve for optimal θ directly without iteration.

### Matrix Notation
| Symbol | Definition |
|--------|-----------|
| **Design matrix X** | m × (n+1) matrix where each row is one training example (x⁽ⁱ⁾)ᵀ |
| **Vector y** | m × 1 column vector of all target values |
| **Vector θ** | (n+1) × 1 parameter vector |

### Cost Function in Matrix Form
$$J(\theta) = \frac{1}{2}(X\theta - y)^T(X\theta - y)$$

### Derivation Steps
1. Take derivative of J(θ) with respect to θ
2. Set derivative equal to **0** (condition for minimum)
3. Solve for θ

### The Normal Equations
$$\nabla_\theta J(\theta) = X^T X \theta - X^T y = 0$$

$$\boxed{\theta = (X^T X)^{-1} X^T y}$$

### Key Properties
- **One-step solution:** No iteration needed
- **Global optimum guaranteed:** For linear regression, J(θ) is a convex bowl (no local minima)
- **Computational cost:** O(n³) for matrix inversion — expensive for very large n
- **Invertibility:** If XᵀX is non-invertible, features are linearly dependent (redundant); use pseudo-inverse or remove duplicate features

---

## 7. Important Properties of Linear Regression Cost Function

- **Convex (bowl-shaped):** No local optima — only global minimum
- **Gradient descent convergence:** Guaranteed to reach global minimum from any starting point
- **Contour plot:** Elliptical contours; gradient is always perpendicular to contour lines

---

## Takeaways & Action Items

| Action | Details |
|--------|---------|
| **For small datasets** | Use **batch gradient descent** or **normal equations** |
| **For large datasets** | Use **stochastic gradient descent**; consider decreasing learning rate over time |
| **Feature scaling** | Scale features to similar ranges (e.g., [-1, 1]) before applying gradient descent |
| **Choosing α** | Try values on a doubling scale (0.001, 0.01, 0.1...); if J(θ) increases, α is too large |
| **Debugging convergence** | Plot J(θ) vs. iterations; should decrease monotonically |
| **When to stop SGD** | Monitor cost over time; stop when cost plateaus |

### Next Steps
- Review detailed matrix derivative derivations in lecture notes
- Practice with Problem Set 1: derive properties using matrix calculus notation
- Prepare for next lecture: classification problems