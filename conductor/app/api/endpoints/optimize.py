from fastapi import APIRouter

from app.core.logger import logger

router = APIRouter()
from pydantic import BaseModel

import cvxpy as cp
import numpy as np

class AnalysisInput(BaseModel):
    id: str
    # period: int
    # options: List[str]
    weights: List[float]
    
@router.get('/')
async def optimize(analysisInput: AnalysisInput):
    logger.info('This is an example of logging')
    # Problem data.
    m = 30
    n = 20
    np.random.seed(1)
    A = np.random.randn(m, n)
    b = np.random.randn(m)

    # Construct the problem.
    x = cp.Variable(n)
    objective = cp.Minimize(cp.sum_squares(A @ x - b))
    constraints = [0 <= x, x <= 1]
    prob = cp.Problem(objective, constraints)

    # The optimal objective value is returned by `prob.solve()`.
    result = prob.solve()
    # The optimal value for x is stored in `x.value`.
    print(x.value)
    # The optimal Lagrange multiplier for a constraint is stored in
    # `constraint.dual_value`.
    print(constraints[0].dual_value)

    return result
